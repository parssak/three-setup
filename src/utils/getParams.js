const DEFAULT_ENTITY_OPTIONS = { inGroup: false }
export default params => {
  return {
    ENTITY_OPTIONS: {
      ...params?.ENTITY_OPTIONS ?? {}, ...DEFAULT_ENTITY_OPTIONS
    },
    ...params
  }
}