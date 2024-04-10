import { Button } from '../../button/Button';
import { getShell } from '../../layouts/Shell';
import { MessageState } from '../../message/MessageState';
import type { NextPageWithLayout } from '../../utils/NextLayout';

const AnotherExample: NextPageWithLayout = () => (
  <MessageState
    title="Another live demo"
    description="Find another live demo in production built on top of Modern MERN / Nextless.js"
    cta={
      <a href="https://postmage.com" target="_blank" rel="noopener noreferrer">
        <Button>Go to Postmage.com</Button>
      </a>
    }
  />
);

AnotherExample.getLayout = getShell('Another Example');

export default AnotherExample;
