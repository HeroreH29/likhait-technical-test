import React, { useState } from "react";
import { Category, CategoryFormData } from "../types";
import { deleteCategory, updateCategory } from "../services/api";
import { COLORS } from "../constants/colors";
import { Button, Modal } from "../vibes";
import CategoryForm from "./CategoryForm";
import BaseTable from "./BaseTable";

type Props = {
  categories: Category[];
  refetch: () => void;
};

const CategoriesTable = ({ categories, refetch }: Props) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;
    try {
      await deleteCategory(deletingCategory.id);
      setIsDeleteModalOpen(false);
      setDeletingCategory(null);
      refetch();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete expense");
    }
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!editingCategory) return;
    try {
      await updateCategory(editingCategory.id, data);
      setIsEditModalOpen(false);
      setEditingCategory(null);
      refetch();
    } catch (error) {
      console.error("Failed to update expense:", error);
      throw error;
    }
  };

  const tdStyle: React.CSSProperties = {
    padding: "0.75rem",
    borderBottom: `1px solid ${COLORS.border}`,
    color: COLORS.text.primary,
  };

  return (
    <>
      <BaseTable<Category>
        data={categories}
        emptyLabel="categories"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        tableHeaders={["Name"]}
        renderRow={(category) => <td style={tdStyle}>{category.name}</td>}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        title="Edit Category"
      >
        {editingCategory && (
          <CategoryForm
            initialData={{
              name: editingCategory.name,
            }}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingCategory(null);
            }}
            submitLabel="Update Category"
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCategory(null);
        }}
        title="Delete Category"
      >
        <div style={{ padding: "1rem 0" }}>
          <p style={{ marginBottom: "1.5rem", color: COLORS.text.primary }}>
            Are you sure you want to delete this category?
          </p>
          {deletingCategory && (
            <p style={{ marginBottom: "1.5rem", color: COLORS.text.secondary }}>
              <strong>{deletingCategory.name}</strong> -{" "}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingCategory(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoriesTable;
