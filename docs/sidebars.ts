import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'introduction',
    'quick-start',
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'concepts/workflow-definition',
        'concepts/states-and-transitions',
        'concepts/events-and-handlers',
        'concepts/entity-service',
      ],
    },
    {
      type: 'category',
      label: 'Recipes',
      items: [
        'recipes/retry-and-error-handling',
        'recipes/human-in-the-loop',
        'recipes/custom-adapter',
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      items: [
        'plugins/durable-lambda',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/lambda-order-state-machine',
        'examples/payment-with-retry',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/workflow-module',
        'api-reference/decorators',
        'api-reference/services',
        'api-reference/interfaces',
        'api-reference/adapters',
      ],
    },
  ],
};

export default sidebars;
