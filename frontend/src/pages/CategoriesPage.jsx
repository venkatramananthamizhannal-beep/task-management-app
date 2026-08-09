import React, { useState, useEffect } from 'react';
import { Plus, FolderKanban, Edit3, Trash2, CheckCircle2, Clock } from 'lucide-react';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import Toast from '../components/common/Toast';
import { categoryService } from '../services/categoryService';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Forms
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [catName, setCatName] = useState('');
  const [catColor, setCatColor] = useState('#6366f1');
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setToast({ message: 'Failed to load categories', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditCategory(null);
    setCatName('');
    setCatColor('#6366f1');
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditCategory(cat);
    setCatName(cat.name);
    setCatColor(cat.color || '#6366f1');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    try {
      setActionLoading(true);
      if (editCategory) {
        await categoryService.updateCategory(editCategory._id, {
          name: catName,
          color: catColor,
        });
        setToast({ message: 'Category updated successfully!', type: 'success' });
      } else {
        await categoryService.createCategory({
          name: catName,
          color: catColor,
        });
        setToast({ message: 'Category created successfully!', type: 'success' });
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Action failed', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await categoryService.deleteCategory(deleteId);
      setDeleteId(null);
      setToast({ message: 'Category deleted.', type: 'success' });
      fetchCategories();
    } catch (err) {
      setToast({ message: 'Failed to delete category', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize your tasks into structured work categories
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          New Category
        </button>
      </div>

      {/* Category Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const completionRate =
              cat.totalTasks > 0
                ? Math.round((cat.completedTasks / cat.totalTasks) * 100)
                : 0;

            return (
              <div
                key={cat._id}
                className="bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: cat.color || '#6366f1' }}
                      />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {cat.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(cat._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Task Stats Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800/80 text-center text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Total</span>
                      <span className="font-extrabold text-slate-900 dark:text-white text-base">
                        {cat.totalTasks}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Completed</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                        {cat.completedTasks}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Pending</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                        {cat.pendingTasks}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span>Progress</span>
                    <span>{completionRate}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${completionRate}%`,
                        backgroundColor: cat.color || '#6366f1',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Category Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editCategory ? 'Edit Category' : 'Create Custom Category'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="e.g. Design, College Project..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={catColor}
                onChange={(e) => setCatColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {catColor}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md"
            >
              {actionLoading ? 'Saving...' : editCategory ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? Associated tasks will be moved to 'Other'."
        loading={actionLoading}
      />
    </div>
  );
};

export default CategoriesPage;
