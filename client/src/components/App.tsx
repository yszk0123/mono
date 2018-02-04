import * as React from 'react';
import { graphql, DataProps } from 'react-apollo';
import gql from 'graphql-tag';
import { NotesQuery } from '../generated/schema';

interface Props {}

class App extends React.Component<DataProps<NotesQuery>> {
  render() {
    const { data: { loading, me } } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <h1>Hello</h1>
        {me &&
          me.notes &&
          me.notes.map(note => <div key={note.id}>{note.text}</div>)}
      </div>
    );
  }
}

const NOTES_QUERY = gql`
  query Notes {
    me {
      notes {
        id
        text
        tags {
          id
          text
        }
        createdAt
      }
    }
  }
`;

export default graphql<Props, NotesQuery>(NOTES_QUERY, {
  options: {
    fetchPolicy: 'network-only',
  },
})(App);
