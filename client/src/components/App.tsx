import * as React from 'react';
import { graphql, DataProps } from 'react-apollo';
import gql from 'graphql-tag';
import { FeedQuery } from '../generated/schema';

interface Props {}

class App extends React.Component<DataProps<FeedQuery>> {
  render() {
    const { data: { loading, feed } } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <h1>Hello</h1>
        {feed && feed.map(post => <div key={post.id}>{post.title}</div>)}
      </div>
    );
  }
}

const FEED_QUERY = gql`
  query Feed {
    feed {
      id
      text
      title
      isPublished
    }
  }
`;

export default graphql<Props, FeedQuery>(FEED_QUERY, {
  options: {
    fetchPolicy: 'network-only',
  },
})(App);
