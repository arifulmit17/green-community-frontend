import React from 'react'
import { CategoryCard } from '../cards/CategoryCard';
import { getCategories } from '@/services/category2.service';



export default async function Categories() {
    const categoryList=await getCategories()
        
  return (
    <div className="w-10/12 grid-cols-1  grid lg:grid-cols-3 gap-5">
      {categoryList?.length > 0 ? (
        categoryList?.slice(0, 3).map((category) => (
          <CategoryCard key={category?.id} category={category} />
        ))
      ) : (
        <p className="col-span-3 text-center text-muted-foreground">
          No categories found
        </p>
      )}
    </div>
  )
}
