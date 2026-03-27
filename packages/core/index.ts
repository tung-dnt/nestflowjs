/**
 * @module nestjs-serverless-workflow/core
 *
 * Core workflow engine for NestJS — provides decorators, services, types, and
 * utilities for defining and executing state-machine-based workflows.
 *
 * @example
 * ```typescript
 * import {
 *   Workflow, OnEvent, Entity, Payload,
 *   WorkflowModule, OrchestratorService,
 * } from 'nestjs-serverless-workflow/core';
 * ```
 */
export * from './decorators';
export * from './providers';
export * from './providers/router.factory';
export * from './types';
export * from './utils';
export * from './workflow.module';
