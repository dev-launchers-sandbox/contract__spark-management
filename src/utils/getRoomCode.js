import queryString from "query-string";

const getRoomCode = () => {
  const query = window.location.search;

  try {
    const queryParsed = queryString.parse(query);
    console.log(queryParsed.code);
    return queryParsed.code;
  } catch (error) {}
};

export default getRoomCode;
