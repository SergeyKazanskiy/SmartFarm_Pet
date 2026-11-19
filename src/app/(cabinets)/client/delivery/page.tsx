import { PageStub } from "@/components/widgets/PageStub";

/*
  Заглушка этапа «Исходные».
*/

export default function Page() {
  return <PageStub title="Доставка" description="Заглушка этапа «Доставка»." />;
}

// app/(cabinets)/client/design/page.tsx
// "use client";

// import { useViewStore } from "@/stores/view-store";
// import { FLOW_META } from "@/features/flow-views/flow-views-config";
// import { pickView } from "@/features/flow-views/merge-views";

// import { DesignSchemaView } from "@/features/flow-views/design/design-schema-view";
// import { Design3DView } from "@/features/flow-views/design/design-3d-view";
// import { DesignListView } from "@/features/flow-views/design/design-list-view";

// const VIEW_COMPONENTS = {
//   schema: DesignSchemaView,
//   "3d": Design3DView,
//   list: DesignListView,
// };

// export default function DesignPage() {
//   const activeViewId = useViewStore((s) => s.view_activeByFlow.design);
//   const View = pickView(FLOW_META.design, VIEW_COMPONENTS, activeViewId);
//   return <View />;
// }