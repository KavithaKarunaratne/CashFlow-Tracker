// src/components/FilterBar.jsx
import TagChip from "./TagChip";

export default function FilterBar({ tags, selectedTags = [], onChange }) {
  const handleToggle = (tag) => {
    if (selectedTags.includes(tag.value)) {
      onChange(selectedTags.filter((t) => t !== tag.value));
    } else {
      onChange([...selectedTags, tag.value]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {tags.map((tag) => (
        <TagChip
          key={tag.value}
          label={tag.label}
          color={tag.color}
          selected={selectedTags.includes(tag.value)}
          onClick={() => handleToggle(tag)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}