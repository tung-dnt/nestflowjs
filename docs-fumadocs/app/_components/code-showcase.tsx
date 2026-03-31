'use client';

import { useState } from 'react';

const definitionTabs = [
  {
    label: 'Workflow',
    code: `import { Workflow, OnEvent, Entity, Payload } from 'nestflow-js/core';

@Workflow({
  name: 'OrderWorkflow',
  states: {
    finals: ['delivered', 'cancelled'],
    idles: ['pending_payment'],
    failed: 'cancelled',
  },
  transitions: [
    { event: 'PAYMENT_RECEIVED', from: ['pending_payment'], to: 'processing' },
    { event: 'SHIP_ORDER', from: ['processing'], to: 'shipped' },
    { event: 'CONFIRM_DELIVERY', from: ['shipped'], to: 'delivered' },
    { event: 'CANCEL', from: ['pending_payment', 'processing'], to: 'cancelled' },
  ],
  entityService: 'entity.order',
})
export class OrderWorkflow {
  @OnEvent('PAYMENT_RECEIVED')
  async onPayment(@Entity() order, @Payload() payload) {
    order.paidAt = new Date();
    return order;
  }
}`,
  },
  {
    label: 'Entity Service',
    code: `import { Injectable } from '@nestjs/common';
import { IWorkflowEntity } from 'nestflow-js/core';

@Injectable()
export class OrderEntityService
  implements IWorkflowEntity<Order, OrderState> {

  async create() {
    return { id: uuid(), status: 'pending_payment' };
  }

  async load(urn: string) {
    return this.repo.findOne(urn);
  }

  async update(order: Order, status: OrderState) {
    order.status = status;
    return this.repo.save(order);
  }

  status(order: Order) { return order.status; }
  urn(order: Order) { return order.id; }
}`,
  },
];

const usageTabs = [
  {
    label: 'Service',
    code: `import { OrchestratorService } from 'nestflow-js/core';

@Injectable()
export class OrderService {
  constructor(private orchestrator: OrchestratorService) {}

  async processPayment(orderId: string, payload: PaymentDto) {
    const result = await this.orchestrator.transit({
      event: 'PAYMENT_RECEIVED',
      urn: orderId,
      payload,
      attempt: 0,
    });

    // result.status: 'final' | 'idle' | 'continued' | 'no_transition'
    return result;
  }
}`,
  },
  {
    label: 'Lambda',
    code: `import { NestFactory } from '@nestjs/core';
import { DurableLambdaEventHandler } from 'nestflow-js/adapter';
import { withDurableExecution } from '@aws/durable-execution-sdk-js';
import { AppModule } from './app.module';

const app = await NestFactory.createApplicationContext(AppModule);

export const handler = DurableLambdaEventHandler(app, withDurableExecution);
// Automatic checkpoint & replay across Lambda invocations
// Idle states pause via waitForCallback()
// Final states end the durable execution`,
  },
];

function TabbedCode({ tabs }: { tabs: { label: string; code: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-w-0 flex-col overflow-hidden">
      <div className="flex border-b-2 border-fd-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={`cursor-pointer border-b-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
              i === active
                ? 'border-[#e0234e] text-[#e0234e]'
                : 'border-transparent text-fd-muted-foreground hover:text-[#e0234e]'
            } -mb-[2px] bg-transparent`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-x-auto rounded-b-lg bg-fd-secondary">
        <pre className="min-h-[280px] p-5 text-[0.8rem] leading-relaxed">
          <code>{tabs[active].code}</code>
        </pre>
      </div>
    </div>
  );
}

export function CodeShowcase() {
  return (
    <section className="bg-fd-secondary/50 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center text-3xl font-bold text-fd-foreground">Define, Transit, Done</h2>
        <p className="mb-10 text-center text-lg text-fd-muted-foreground">
          Define workflows with decorators, transit states with a clean type-safe API
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <TabbedCode tabs={definitionTabs} />
          <TabbedCode tabs={usageTabs} />
        </div>
      </div>
    </section>
  );
}
