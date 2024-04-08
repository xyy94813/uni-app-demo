export type DataTransformerMatcher = RegExp;

export type DataTransformerFN<Input, Output = Input> = (origin: Input) => Output;

export type DataTransformerConf<Input = unknown, Output = Input> = [DataTransformerMatcher, DataTransformerFN<Input, Output>]

export const createTransformerConf = <Input, Output = Input>(
    matcher: DataTransformerMatcher,
    transformer: DataTransformerFN<Input, Output>,
) => [matcher, transformer] as DataTransformerConf<Input, Output>

export const createTransformer = 
    <Input, Output = Input, Conf = DataTransformerConf<Input, Output>>(confs?: Iterable<Conf>) => new Set<Conf>(confs)

export const transformData =  <Output, Input = Output>(transform: Set<DataTransformerConf<Input, Output>>, input: Input): Output => {
    const iterator = transform.values()
    let next = iterator.next()
    while(!(next?.done)) {
      const regexp = next.value[0]
      if (regexp.test(input as string)) {
        const transformer = next.value[1]
        return transformer(input)
      }
      next = iterator.next()
    }
    return input as unknown as Output;
}
