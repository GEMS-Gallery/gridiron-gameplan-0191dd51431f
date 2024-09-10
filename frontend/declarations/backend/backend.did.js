export const idlFactory = ({ IDL }) => {
  const SeasonInfo = IDL.Record({
    'endDate' : IDL.Opt(IDL.Text),
    'year' : IDL.Text,
    'startDate' : IDL.Opt(IDL.Text),
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'getSeasonInfo' : IDL.Func([], [SeasonInfo], ['query']),
    'updateSeasonInfo' : IDL.Func([SeasonInfo], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
