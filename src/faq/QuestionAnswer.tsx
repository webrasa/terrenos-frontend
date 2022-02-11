import { ReactNode } from 'react';

type IQuestionAnswerProps = {
  question: string;
  children: ReactNode;
};

const QuestionAnswer = (props: IQuestionAnswerProps) => (
  <div className="p-4 mx-auto mt-8 first:mt-0 rounded-md border border-gray-200 shadow sm:p-6 sm:w-3/4 question-answer">
    <div className="text-2xl font-semibold text-primary-500">
      {props.question}
    </div>

    <div className="mt-4 text-lg leading-7">{props.children}</div>

    <style jsx>
      {`
        .question-answer :global(p) {
          @apply mt-3;
        }

        .question-answer :global(a) {
          @apply text-primary-500;
        }

        .question-answer :global(a:hover) {
          @apply underline;
        }
      `}
    </style>
  </div>
);

export { QuestionAnswer };
