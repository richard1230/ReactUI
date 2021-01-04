
 export interface SourceDataItem {
    text: string;
    value: string;
    children?: SourceDataItem[];
}

 type A = {
     selected: string[],
     multiple: true,
     onChange: (NewSelected: string []) => void

 }
 type B = {
     selected: string,
      multiple?: false,
     onChange: (NewSelected: string) => void
 }

 export type TreeProps = {
     sourceData: SourceDataItem[];
 } & (A | B)

