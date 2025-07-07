import React from "react";
import { Link, useMatches } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the shape of our handle object
interface RouteHandle {
  breadcrumb?: (data: any) => React.ReactNode;
}

export function DashboardLayoutBreadcrumb() {
  const matches = useMatches() as {
    id: string;
    pathname: string;
    data: any;
    handle: RouteHandle;
  }[];

  // Filter out routes that don't have a breadcrumb function
  const crumbs = matches.filter((match) => Boolean(match.handle?.breadcrumb));

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {crumbs.map((match, index) => {
          const isLast = index === crumbs.length - 1;
          const crumb = match.handle.breadcrumb!(match.data);

          return (
            <React.Fragment key={match.id}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={match.pathname}>{crumb}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
