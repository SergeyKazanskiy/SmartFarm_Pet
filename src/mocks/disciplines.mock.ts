import type { Discipline } from '@/types/file-manager'

// Важно: одинаковый code может иметь разные id в разных папках.
// Это соответствует связи folders (1) -> disciplines (N).
export const mockDisciplines: Discipline[] = [
  { id: 'd_receiving_tech', folder_id: 'folder_receiving', code: 'TECH', title: 'Технология', icon: 'workflow', sort_order: 1 },
  { id: 'd_receiving_em', folder_id: 'folder_receiving', code: 'ЭМ', title: 'Электрооборудование', icon: 'zap', sort_order: 2 },
  { id: 'd_equipment_tech', folder_id: 'folder_equipment', code: 'TECH', title: 'Технология', icon: 'workflow', sort_order: 1 },
  { id: 'd_equipment_em', folder_id: 'folder_equipment', code: 'ЭМ', title: 'Электрооборудование', icon: 'zap', sort_order: 2 },
  { id: 'd_conveyors_tech', folder_id: 'folder_conveyors', code: 'TECH', title: 'Технология', icon: 'workflow', sort_order: 1 },
  { id: 'd_conveyors_em', folder_id: 'folder_conveyors', code: 'ЭМ', title: 'Электрооборудование', icon: 'zap', sort_order: 2 },
  { id: 'd_drying_tech', folder_id: 'folder_drying', code: 'TECH', title: 'Технология', icon: 'workflow', sort_order: 1 },
  { id: 'd_drying_em', folder_id: 'folder_drying', code: 'ЭМ', title: 'Электрооборудование', icon: 'zap', sort_order: 2 },
  { id: 'd_silos_arch', folder_id: 'folder_silos', code: 'АР', title: 'Архитектура', icon: 'building-2', sort_order: 1 },
  { id: 'd_silos_em', folder_id: 'folder_silos', code: 'ЭМ', title: 'Электрооборудование', icon: 'zap', sort_order: 2 },
  { id: 'd_admin_arch', folder_id: 'folder_admin', code: 'АР', title: 'Архитектура', icon: 'building-2', sort_order: 1 },
  { id: 'd_foundations_km', folder_id: 'folder_foundations', code: 'КМ', title: 'Металлические конструкции', icon: 'construction', sort_order: 1 },
  { id: 'd_plan_gp', folder_id: 'folder_general_plan', code: 'ГП', title: 'Генеральный план', icon: 'map', sort_order: 1 },
  { id: 'd_power_es', folder_id: 'folder_power_networks', code: 'ЭС', title: 'Электроснабжение', icon: 'cable', sort_order: 1 },

  { id: 'd2_receiving_tech', folder_id: 'folder2_receiving', code: 'TECH', title: 'Технология', icon: 'workflow', sort_order: 1 },
  { id: 'd2_power_es', folder_id: 'folder2_power', code: 'ЭС', title: 'Электроснабжение', icon: 'cable', sort_order: 1 },
]
