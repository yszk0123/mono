/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface NotesQuery {
  me:  {
    notes:  Array< {
      id: string,
      text: string,
      tags:  Array< {
        id: string,
        text: string,
      } > | null,
      createdAt: string,
    } >,
  } | null,
};
