import React, { Suspense } from "react";

const LazyComponent = React.lazy(
  () => import("./components/DynamicDashboardPage")
);

export default function Dashboard(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
