import React from "react";
import { connect } from "react-redux";
import { fetchQuestionsAndUsers } from "../../../actions";
import QuestionSummary from "../QuestionSummary/QuestionSummary";
import QuestionListHeader from "../QuestionListHeader/QuestionListHeader";

class QuestionList extends React.Component {
  componentDidMount() {
    this.props.fetchQuestionsAndUsers(1, null);
  }

  render() {
    return (
      <div className="component-question-list">
        <div className="container-question-list">
          <QuestionListHeader />
          {this.props.questions.map((post) => (
            <QuestionSummary post={post} key={post.id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: Object.values(state.posts).filter(
      (post) => post.post_type_id === 1
    ),
  };
};

export default connect(mapStateToProps, { fetchQuestionsAndUsers })(
  QuestionList
);
