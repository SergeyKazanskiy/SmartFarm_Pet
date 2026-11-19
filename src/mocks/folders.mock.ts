import type { Folder } from '@/types/file-manager'

export const mockFolders: Folder[] = [
  // Элеватор / Технология
  { id: 'folder_receiving', category_id: 'cat_technology', parent_id: null, title: 'Зернопогрузка', sort_order: 1 },
  { id: 'folder_equipment', category_id: 'cat_technology', parent_id: 'folder_receiving', title: 'Оборудование', sort_order: 1 },
  { id: 'folder_conveyors', category_id: 'cat_technology', parent_id: 'folder_equipment', title: 'Конвейеры', sort_order: 1 },
  { id: 'folder_drying', category_id: 'cat_technology', parent_id: null, title: 'Зерносушилка', sort_order: 2 },
  { id: 'folder_transport', category_id: 'cat_technology', parent_id: null, title: 'Транспорт', sort_order: 3 },

  // Элеватор / Сооружения
  { id: 'folder_silos', category_id: 'cat_structures', parent_id: null, title: 'Силосный корпус', sort_order: 1 },
  { id: 'folder_admin', category_id: 'cat_structures', parent_id: null, title: 'Административный корпус', sort_order: 2 },

  // Элеватор / Конструкции
  { id: 'folder_foundations', category_id: 'cat_constructions', parent_id: null, title: 'Фундаменты', sort_order: 1 },

  // Элеватор / План
  { id: 'folder_general_plan', category_id: 'cat_plan', parent_id: null, title: 'Генеральный план', sort_order: 1 },

  // Элеватор / Сети
  { id: 'folder_power_networks', category_id: 'cat_networks', parent_id: null, title: 'Силовые сети', sort_order: 1 },

  // Зерновой терминал
  { id: 'folder2_receiving', category_id: 'cat2_technology', parent_id: null, title: 'Приём зерна', sort_order: 1 },
  { id: 'folder2_power', category_id: 'cat2_networks', parent_id: null, title: 'Электроснабжение', sort_order: 1 },
]
