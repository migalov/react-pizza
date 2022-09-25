import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={510}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="120" r="120" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="419" rx="10" ry="10" width="100" height="44" />
    <rect x="120" y="419" rx="24" ry="24" width="160" height="44" />
  </ContentLoader>
);
