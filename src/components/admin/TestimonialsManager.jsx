import { useMemo, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

export default function TestimonialsManager() {
  const { testimonials, refreshData } = useAdmin();

  const serviceOptions = [
    'SEO & Performance Marketing',
    'Web Development',
    'UI/UX Design',
    'Social Media Management',
    'Online Reputation Management',
    'Local Listings & GBP Management',
    'Fraud Detection & Review Management',
    'E-commerce Solutions',
    'Content Marketing',
    'Digital Strategy',
    'General',
  ];

  const [form, setForm] = useState({
    clientName: '',
    position: '',
    company: '',
    quote: '',
    rating: 5,
    service: 'General',
    isPublished: true,
    isFeatured: false,
    verificationStatus: 'verified',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!form.clientName || !form.position || !form.company || !form.quote) {
        toast.error('Please fill all required fields');
        return;
      }
      const payload = {
        client: { name: form.clientName, position: form.position, company: form.company },
        quote: form.quote,
        rating: Number(form.rating) || 5,
        service: form.service,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
        verificationStatus: form.verificationStatus,
      };
      const res = await apiService.testimonials.create(payload);
      if (res?.success) {
        toast.success('Testimonial created');
        setForm({ clientName: '', position: '', company: '', quote: '', rating: 5, service: 'General', isPublished: true, isFeatured: false, verificationStatus: 'verified' });
        await refreshData();
      } else {
        toast.error('Failed to create testimonial');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error creating testimonial');
    }
  };

  const rows = useMemo(() => (testimonials || []).map((t) => ({
    id: t._id,
    client: t?.client?.name || '—',
    company: t?.client?.company || '—',
    rating: t.rating || 0,
    published: t.isPublished,
    featured: t.isFeatured,
    verified: t.verificationStatus === 'verified',
    quote: t.quote,
  })), [testimonials]);

  return (
    <div className="space-y-6">
      {/* Create form */}
      <form onSubmit={handleCreate} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Create Testimonial</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Client Name</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Position</label>
            <input name="position" value={form.position} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Company</label>
            <input name="company" value={form.company} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" required />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Service</label>
            <select name="service" value={form.service} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white">
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Rating</label>
            <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
              Published
            </label>
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
              Featured
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Quote</label>
          <textarea name="quote" value={form.quote} onChange={handleChange} className="w-full min-h-[70px] bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" required />
        </div>
        <div className="flex items-center">
          <button type="submit" className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">Create</button>
        </div>
      </form>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Testimonials</h2>
        <div className="text-sm text-gray-400">Total: {rows.length}</div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Published</th>
                <th className="px-6 py-3 text-left">Verified</th>
                <th className="px-6 py-3 text-left">Featured</th>
                <th className="px-6 py-3 text-left">Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-3 text-white">{r.client}</td>
                  <td className="px-6 py-3 text-gray-300">{r.company}</td>
                  <td className="px-6 py-3 text-gray-300">{r.rating}★</td>
                  <td className="px-6 py-3"><span className={`px-2 py-1 rounded text-xs ${r.published ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>{r.published ? 'Yes' : 'No'}</span></td>
                  <td className="px-6 py-3"><span className={`px-2 py-1 rounded text-xs ${r.verified ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-600/20 text-gray-400'}`}>{r.verified ? 'Yes' : 'No'}</span></td>
                  <td className="px-6 py-3"><span className={`px-2 py-1 rounded text-xs ${r.featured ? 'bg-purple-600/20 text-purple-400' : 'bg-gray-600/20 text-gray-400'}`}>{r.featured ? 'Yes' : 'No'}</span></td>
                  <td className="px-6 py-3 text-gray-300 line-clamp-1 max-w-xs">{r.quote}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400">No testimonials found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


