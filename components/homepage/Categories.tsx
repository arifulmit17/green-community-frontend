import React from 'react'
import { CategoryCard } from '../cards/CategoryCard';
import { categoriesService } from '@/services/category.service';



export default async function Categories() {
    const {data}=await categoriesService?.getAllCategories()
        const categoryList=await data?.json();
        console.log(categoryList.data);
        
  return (
    <div className="w-11/12 grid-cols-1  grid lg:grid-cols-3 gap-5">
      {categoryList?.data.length > 0 ? (
        categoryList?.data.map((category) => (
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
