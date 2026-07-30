/**
 * Calendar expense table component
 */

import { useState } from "react";
import { Expense, ExpenseFormData } from "../types";
import { formatCurrency, formatDate } from "../utils/expenseUtils";
import { COLORS } from "../constants/colors";
import { Button, Modal } from "../vibes";
import { ExpenseForm } from "./ExpenseForm.tsx";
import { deleteExpense, updateExpense } from "../services/api";
import BaseTable from "./BaseTable.tsx";
import tdStyle from "../styles/tdStyle.tsx";
import { getCategoryEmoji } from "../constants/categoryEmojis.ts";

interface CalendarExpenseTableProps {
  expenses: Expense[];
  onExpenseUpdated: () => void;
}

export function CalendarExpenseTable({
  expenses,
  onExpenseUpdated,
}: CalendarExpenseTableProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = async () => {
    if (!deletingExpense) return;
    try {
      await deleteExpense(deletingExpense.id);
      setIsDeleteModalOpen(false);
      setDeletingExpense(null);
      onExpenseUpdated();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete expense");
    }
  };

  const handleUpdate = async (data: ExpenseFormData) => {
    if (!editingExpense) return;
    try {
      await updateExpense(editingExpense.id, data);
      setIsEditModalOpen(false);
      setEditingExpense(null);
      onExpenseUpdated();
    } catch (error) {
      console.error("Failed to update expense:", error);
      throw error;
    }
  };

  const handleEdit = (data: Expense) => {
    setEditingExpense(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: Expense) => {
    setDeletingExpense(data);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <BaseTable<Expense>
        data={expenses}
        emptyLabel="expenses"
        tableHeaders={["Date", "Description", "Category", "Amount"]}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        renderRow={(expense) => (
          <>
            <td style={tdStyle}>{formatDate(new Date(expense.date))}</td>
            <td style={tdStyle}>{expense.description}</td>
            <td style={tdStyle}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>{getCategoryEmoji(expense.category)}</span>
                <span>{expense.category}</span>
              </span>
            </td>
            <td style={{ ...tdStyle, textAlign: "left", fontWeight: 600 }}>
              {formatCurrency(expense.amount)}
            </td>
          </>
        )}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingExpense(null);
        }}
        title="Edit Expense"
      >
        {editingExpense && (
          <ExpenseForm
            initialData={{
              amount: editingExpense.amount.toString(),
              description: editingExpense.description,
              category: editingExpense.category,
              date: formatDate(new Date(editingExpense.date)),
            }}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingExpense(null);
            }}
            submitLabel="Update Expense"
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingExpense(null);
        }}
        title="Delete Expense"
      >
        <div style={{ padding: "1rem 0" }}>
          <p style={{ marginBottom: "1.5rem", color: COLORS.text.primary }}>
            Are you sure you want to delete this expense?
          </p>
          {deletingExpense && (
            <p style={{ marginBottom: "1.5rem", color: COLORS.text.secondary }}>
              <strong>{deletingExpense.description}</strong> -{" "}
              {formatCurrency(deletingExpense.amount)}
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
                setDeletingExpense(null);
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
}
