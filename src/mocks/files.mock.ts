import type { FileRecord } from '@/types/file-manager'

export const mockFiles: FileRecord[] = [
  { id: 'file_tech_scheme', folder_id: 'folder_receiving', discipline_id: 'd_receiving_tech', title: 'Технологическая схема', status: 'ready', updated_at: '2026-11-05T10:00:00Z' },
  { id: 'file_receiving_em', folder_id: 'folder_receiving', discipline_id: 'd_receiving_em', title: 'План электрооборудования', status: 'progress', updated_at: '2026-11-05T11:00:00Z' },
  { id: 'file_equipment_list', folder_id: 'folder_equipment', discipline_id: 'd_equipment_tech', title: 'Ведомость оборудования', status: 'draft', updated_at: '2026-11-04T09:00:00Z' },
  { id: 'file_conveyor_scheme', folder_id: 'folder_conveyors', discipline_id: 'd_conveyors_tech', title: 'Схема конвейеров', status: 'ready', updated_at: '2026-11-03T09:00:00Z' },
  { id: 'file_conveyor_em', folder_id: 'folder_conveyors', discipline_id: 'd_conveyors_em', title: 'Схема управления приводами', status: 'draft', updated_at: '2026-11-06T12:00:00Z' },
  { id: 'file_drying_tech', folder_id: 'folder_drying', discipline_id: 'd_drying_tech', title: 'Технологическая схема сушилки', status: 'ready', updated_at: '2026-11-02T08:00:00Z' },
  { id: 'file_silos_arch', folder_id: 'folder_silos', discipline_id: 'd_silos_arch', title: 'Архитектурный план силосов', status: 'ready', updated_at: '2026-11-01T08:00:00Z' },
  { id: 'file_silos_em', folder_id: 'folder_silos', discipline_id: 'd_silos_em', title: 'Освещение силосного корпуса', status: 'draft', updated_at: '2026-11-02T08:00:00Z' },
  { id: 'file_admin_arch', folder_id: 'folder_admin', discipline_id: 'd_admin_arch', title: 'План этажей', status: 'ready', updated_at: '2026-11-01T08:00:00Z' },
  { id: 'file_foundations_km', folder_id: 'folder_foundations', discipline_id: 'd_foundations_km', title: 'Схема фундаментов', status: 'progress', updated_at: '2026-11-01T08:00:00Z' },
  { id: 'file_general_plan', folder_id: 'folder_general_plan', discipline_id: 'd_plan_gp', title: 'Генплан участка', status: 'draft', updated_at: '2026-11-01T08:00:00Z' },
  { id: 'file_power_es', folder_id: 'folder_power_networks', discipline_id: 'd_power_es', title: 'Однолинейная схема', status: 'ready', updated_at: '2026-11-01T08:00:00Z' },

  { id: 'file2_tech_scheme', folder_id: 'folder2_receiving', discipline_id: 'd2_receiving_tech', title: 'Схема приёма зерна', status: 'ready', updated_at: '2026-11-05T10:00:00Z' },
  { id: 'file2_power_es', folder_id: 'folder2_power', discipline_id: 'd2_power_es', title: 'Схема электроснабжения', status: 'draft', updated_at: '2026-11-05T10:00:00Z' },
]
