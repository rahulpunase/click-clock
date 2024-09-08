import React, { Suspense } from "react";

import AppLoader from "@/common/components/AppLoader";

export function lazyLoadComponent<TP>(
  name: string,
  Component: React.ComponentType<TP>,
) {
  return withSuspense<TP>(name, Component);
}

function withSuspense<TP>(
  name: string,
  WrappedComponent: React.ComponentType<TP>,
) {
  return (props: any) => (
    <LazyLoadErrorBoundary name={name}>
      <Suspense fallback={<AppLoader />}>
        <WrappedComponent {...props} />
      </Suspense>
    </LazyLoadErrorBoundary>
  );
}

export class LazyLoadErrorBoundary extends React.Component<{
  name: string;
  children: React.ReactNode;
}> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (error) {
      console.error(`Error in ${this.props.name}`, errorInfo);
    }
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    if (hasError) {
      return <div>SOME ERROR OCCURRED</div>;
    }

    return this.props.children;
  }
}

export const lazyWrapper = (factory: () => Promise<any>) => {
  return async () => {
    const page = await factory();
    return {
      Component: page.default,
      ErrorBoundary: page?.ErrorBoundary,
      loader: page?.loader,
    };
  };
};
