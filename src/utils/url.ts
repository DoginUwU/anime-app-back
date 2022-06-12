const queryToJson = (query: string): any => { 
    return JSON.parse(
      '{"' +
        decodeURI(query)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
}

export { queryToJson };