import React from 'react'
import { CategoryCard } from '../cards/CategoryCard';
import { getCategories } from '@/services/category2.service';
import Link from 'next/link';



export default async function Categories() {
    const categoryList=await getCategories()
        
  return (
    <div className="w-10/12 space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {categoryList?.length > 0 ? (
          categoryList.slice(0, 3).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <p className="col-span-3 text-center text-muted-foreground">
            No categories found
          </p>
        )}
      </div>
      {categoryList?.length > 3 && (
        <div className="text-center">
          <Link href="/ideas" className="font-medium text-green-700 hover:text-green-800 hover:underline">
            View all categories and ideas
          </Link>
        </div>
      )}
    </div>
  )
}
