/**
 * SEO-optimized meta descriptions for each documentation page.
 *
 * Each description:
 * - Targets 150-160 characters
 * - Includes a primary keyword naturally
 * - Communicates a clear value proposition
 * - Contains a call-to-action element
 */
export const seoDescriptions: Record<string, string> = {
  '/': 'NestflowJS: the decorator-driven state machine library for NestJS. Build type-safe workflows with states, transitions, and event handlers. Get started today.',

  '/docs/introduction':
    'Learn how NestflowJS brings decorator-driven state machines to NestJS. Understand core concepts, architecture, and why it simplifies workflow orchestration.',

  '/docs/quick-start':
    'Get NestflowJS running in under 5 minutes. Install the package, define your first state machine with decorators, and trigger transitions in your NestJS app.',

  '/docs/concepts/workflow-definition':
    'Define workflows declaratively with NestflowJS decorators. Learn how to structure state machines, configure transitions, and compose reusable workflow modules.',

  '/docs/concepts/states-and-transitions':
    'Master states and transitions in NestflowJS. Configure state entry and exit actions, guard conditions, and transition logic for robust NestJS workflow control.',

  '/docs/concepts/events-and-handlers':
    'Handle events in your NestJS state machine with NestflowJS event decorators. Route events to handlers, manage side effects, and build reactive workflows.',

  '/docs/concepts/entity-service':
    'Persist and manage workflow entities with the NestflowJS entity service. Connect state machines to your database layer for durable state tracking in NestJS.',

  '/docs/plugins/durable-lambda':
    'Run NestflowJS state machines on AWS Lambda with durable execution. Deploy serverless workflows that survive timeouts and cold starts. Step-by-step setup guide.',

  '/docs/recipes/retry-and-error-handling':
    'Add retry logic and error handling to NestflowJS workflows. Configure backoff strategies, dead-letter states, and fault-tolerant transitions in your NestJS app.',

  '/docs/recipes/human-in-the-loop':
    'Build human-in-the-loop workflows with NestflowJS. Pause state machines for manual approval, external input, or review steps before continuing execution.',

  '/docs/recipes/custom-adapter':
    'Create custom adapters for NestflowJS to integrate any persistence layer or message broker. Extend the state machine engine to fit your NestJS infrastructure.',

  '/docs/examples/lambda-order-state-machine':
    'Full example: build an order processing state machine on AWS Lambda with NestflowJS. Handle order creation, payment, fulfillment, and cancellation workflows.',

  '/docs/examples/payment-with-retry':
    'Example: implement a payment workflow with automatic retry in NestflowJS. Handle transient failures, exponential backoff, and compensation logic in NestJS.',

  '/docs/api-reference/workflow-module':
    'NestflowJS WorkflowModule API reference. Configure and register state machine modules in NestJS with forRoot and forFeature options. Full parameter documentation.',

  '/docs/api-reference/decorators':
    'Complete NestflowJS decorator API reference. Explore @State, @Transition, @OnEvent, @Guard, and all decorators for building type-safe NestJS state machines.',

  '/docs/api-reference/services':
    'NestflowJS services API reference. Use WorkflowService and StateService to trigger transitions, query state, and manage workflow instances programmatically.',

  '/docs/api-reference/interfaces':
    'NestflowJS TypeScript interfaces reference. Type definitions for states, transitions, events, guards, and configuration objects used across the library.',

  '/docs/api-reference/adapters':
    'NestflowJS adapter API reference. Built-in adapters for persistence and messaging, plus the interface contract for implementing custom adapters in NestJS.',
};
