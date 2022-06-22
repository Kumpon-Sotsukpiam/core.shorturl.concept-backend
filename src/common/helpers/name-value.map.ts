export const name_value_map = (data: Array<{ name: string; value: any }>) => {
  let json = {};
  data.forEach(({ name, value }) => {
    json[name] = value;
  });
  return json;
};
