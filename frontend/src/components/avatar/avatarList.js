const avatarModules = import.meta.glob("./*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const avatarList = Object.entries(avatarModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
    return numA - numB;
  })
  .map(([, value]) => value);


export default avatarList;