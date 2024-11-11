import React from 'react';
import { ProductFilters as FilterType } from '../types';

interface ProductFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const categories = [
    'All',
    'Electronics',
    'Accessories',
    'Furniture',
    'Fitness'
  ];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={filters.search || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search products..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={filters.category || 'All'}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              category: e.target.value === 'All' ? undefined : e.target.value,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <div className="mt-1 grid grid-cols-2 gap-4">
          <input
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder="Min"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder="Max"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={filters.sortBy || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              sortBy: e.target.value as FilterType['sortBy'],
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};