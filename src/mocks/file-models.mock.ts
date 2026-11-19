import type { FileModel } from '@/types/file-manager'

// Инженерные данные не входят в загрузку структуры проекта.
// Они запрашиваются отдельно по fileId при открытии/восстановлении файла.
export const mockFileModels: Record<string, FileModel> = {
  file_tech_scheme: {
    fileId: 'file_tech_scheme',
    nodes: [
      { id: 'n1', file_id: 'file_tech_scheme', type: 'equipment', title: 'Приёмный бункер', data: { capacity_t_h: 100 }, position: { x: 80, y: 120 } },
      { id: 'n2', file_id: 'file_tech_scheme', type: 'conveyor', title: 'Конвейер К1', data: { length_m: 25 }, position: { x: 300, y: 120 } },
      { id: 'n3', file_id: 'file_tech_scheme', type: 'equipment', title: 'Нория Н1', data: { height_m: 18 }, position: { x: 520, y: 120 } },
    ],
    edges: [
      { id: 'e1', file_id: 'file_tech_scheme', source: 'n1', target: 'n2', type: 'default' },
      { id: 'e2', file_id: 'file_tech_scheme', source: 'n2', target: 'n3', type: 'default' },
    ],
  },

  file_conveyor_em: {
    fileId: 'file_conveyor_em',
    nodes: [
      { id: 'em1', file_id: 'file_conveyor_em', type: 'motor', title: 'Двигатель М1', data: { power_kw: 7.5 }, position: { x: 100, y: 100 } },
      { id: 'em2', file_id: 'file_conveyor_em', type: 'starter', title: 'Пускатель КМ1', data: { voltage_v: 400 }, position: { x: 360, y: 100 } },
    ],
    edges: [
      { id: 'eme1', file_id: 'file_conveyor_em', source: 'em2', target: 'em1', type: 'electrical' },
    ],
  },

  file_silos_em: {
    fileId: 'file_silos_em',
    nodes: [
      { id: 's1', file_id: 'file_silos_em', type: 'light', title: 'Светильник L1', data: { power_w: 120 }, position: { x: 160, y: 160 } },
    ],
    edges: [],
  },

  file2_tech_scheme: {
    fileId: 'file2_tech_scheme',
    nodes: [
      { id: 't2n1', file_id: 'file2_tech_scheme', type: 'equipment', title: 'Автомобильная разгрузка', data: { lanes: 2 }, position: { x: 100, y: 100 } },
    ],
    edges: [],
  },
}
