import { useState } from 'react';

import {
    getAllCategoriesService,
    createCategoryService,
    editCategoryService,
    removeCategoryService,
} from '../services/categories-services.js';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    const retrieve = async () => {
        const categories = await getAllCategoriesService();
        setCategories(categories);
    };

    const create = async (categoryName) => {
        const category = await createCategoryService({
            name: categoryName.toLowerCase(),
        });
        setCategories([...categories, category]);
    };

    const edit = async (categoryId, payload) => {
        const editedCategory = await editCategoryService(categoryId, payload);
        setCategories(
            categories.map((category) => {
                if (category.id === categoryId) {
                    return editedCategory;
                }

                return category;
            })
        );
    };

    const remove = async (categoryId) => {
        await removeCategoryService(categoryId);
        setCategories(
            categories.filter((category) => category.id !== categoryId)
        );
    };

    return {
        state: {
            categories,
        },
        actions: {
            edit,
            retrieve,
            create,
            remove,
        },
    };
};

export default useCategories;
