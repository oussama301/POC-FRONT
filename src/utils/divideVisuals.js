export const divideVisuals = (visual_groups) => {
  const dashboard1 = visual_groups[0]?.visuals || [];
  const dashboard2 = visual_groups[1]?.visuals || [];
  const dashboard3 = visual_groups[2]?.visuals || [];

  return { dashboard1, dashboard2, dashboard3 };
};
