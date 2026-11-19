import type { Category } from '@/types/file-manager'

export const mockCategories: Category[] = [
  { id: 'cat_technology', project_id: 'project_elevator', title: 'Технология', sort_order: 1 },
  { id: 'cat_structures', project_id: 'project_elevator', title: 'Сооружения', sort_order: 2 },
  { id: 'cat_constructions', project_id: 'project_elevator', title: 'Конструкции', sort_order: 3 },
  { id: 'cat_plan', project_id: 'project_elevator', title: 'План', sort_order: 4 },
  { id: 'cat_networks', project_id: 'project_elevator', title: 'Сети', sort_order: 5 },

  { id: 'cat2_technology', project_id: 'project_grain_terminal', title: 'Технология', sort_order: 1 },
  { id: 'cat2_networks', project_id: 'project_grain_terminal', title: 'Сети', sort_order: 2 },
]
