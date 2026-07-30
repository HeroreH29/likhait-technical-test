import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Button, Modal } from "../vibes";
import { Category, CategoryFormData } from "../types";
import { createCategory, fetchCategories } from "../services/api";
import loadingStyle from "../styles/loadingStyle";
import CategoriesTable from "../components/CategoriesTable";
import CategoryForm from "../components/CategoryForm";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initCategories();
  }, []);

  const initCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      setIsModalOpen(false);
      initCategories();
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  };

  return (
    <>
      <PageHeader
        title="Categories"
        headerChildren={
          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            Add category
          </Button>
        }
      />

      <div>
        {loading ? (
          <div style={loadingStyle}>Loading...</div>
        ) : (
          <div style={{ marginTop: "32px" }}>
            <CategoriesTable categories={categories} refetch={initCategories} />
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default CategoriesPage;
