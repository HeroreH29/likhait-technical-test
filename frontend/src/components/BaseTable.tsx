import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import { Button, Pagination } from "../vibes";
import tdStyle from "../styles/tdStyle";

interface Entity {
  id: number;
}

type BaseTableProps<T extends Entity> = {
  data: T[];
  emptyLabel: string;
  tableHeaders: string[];
  renderRow: (item: T) => React.ReactNode;
  handleEdit: (item: T) => void;
  handleDelete: (item: T) => void;
};

const ITEMS_PER_PAGE = 10;

function BaseTable<T extends Entity>({
  data,
  emptyLabel,
  tableHeaders,
  renderRow,
  handleEdit,
  handleDelete,
}: BaseTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: COLORS.background.main,
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: `1px solid ${COLORS.border}`,
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: COLORS.background.card,
  };

  const thStyle: React.CSSProperties = {
    padding: "0.75rem",
    textAlign: "left",
    fontWeight: 600,
    color: COLORS.text.primary,
    borderBottom: `2px solid ${COLORS.border}`,
  };

  const emptyStyle: React.CSSProperties = {
    padding: "2rem",
    textAlign: "center",
    color: COLORS.text.secondary,
  };

  const actionButtonsStyle: React.CSSProperties = {
    justifyContent: "center",
    display: "flex",
    gap: "0.5rem",
  };

  if (data.length === 0) {
    return (
      <div style={tableStyle}>
        <div style={emptyStyle}>No {emptyLabel} found.</div>
      </div>
    );
  }

  return (
    <>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} style={thStyle}>
                {header}
              </th>
            ))}
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              {renderRow(item)}

              <td style={{ ...tdStyle, textAlign: "center" }}>
                <div style={actionButtonsStyle}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default BaseTable;
