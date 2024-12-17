import React from "react";
import { Form } from "react-bootstrap";

interface SelectCategoryProps {
  items: string[];
  selectedItem: string | null;
  onChangeCategory: (value: string | null) => void;
}
export const SelectCategory: React.FC<SelectCategoryProps> = ({
  items,
  selectedItem,
  onChangeCategory,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value || null)
    onChangeCategory(event.target.value || null);
  };

  return (
    <Form.Select aria-label="Default select example" onChange={handleChange} value={selectedItem || ''}>
      <option value=''>Все категории</option>
      {items.map((item) => (
        <option value={item} key={item}>{item}</option>
      ))}
    </Form.Select>
  );
};
