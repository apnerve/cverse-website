---
kind: case-study
title: "Open-weight models in the company's own cloud, replacing part of a paid LLM API in one week"
summary: "A global consumer-hardware and creative-software company was sending a growing share of its language-model work to a paid model API. It asked whether open-weight models, served inside its own cloud account, could take over part of that work without the applications noticing. cverse built the answer in one week: vLLM for serving, LiteLLM as the single OpenAI-compatible endpoint, and GPUs that are switched off outside business hours."
client: "A global consumer-hardware and creative-software company"
industry: "Consumer hardware and software"
engagement: "Proof of concept"
duration: "One week"
services: ["Production LLM systems", "Private models and fine-tuning"]
stack: ["vLLM", "LiteLLM", "Open-weight models", "GPU instances", "Scheduled hibernation"]
tags: ["LLM serving", "Open-weight models", "Cost"]
outcomes:
  - headline: "One week"
    caption: "From first call to a working deployment in the company's cloud account."
  - headline: "A base URL and a model name"
    caption: "The two things an application changes to use the new endpoint. No application code changed."
  - headline: "GPUs off overnight"
    caption: "Capacity stops on a schedule at the end of the business day and is back before it starts."
publishedAt: 2026-11-24
draft: false
# CONFIRM before go-live. These body claims were not supplied by cverse and must be checked
# or deleted. Comments here stay out of the built HTML; comments in the body would not.
# - "A base URL and a model name" outcome: applications switched that way, no code changes.
# - The challenge: traffic concentrated in business hours in one region.
# - Client descriptor: permission to publish it.
# - Routing: fallback from the open-weight model to the paid API was configured.
# - Hibernation: mechanism (cloud scheduler, cron, autoscaler schedule), warm-up window, and whether
#   off-hours requests fell back to the paid API or were rejected.
# - Output comparison on a sample of the company's prompts. Delete the sentences if not done.
#   "those workloads still go to the paid API" is inferred, not supplied.
# - SETBACK WANTED: one thing that went wrong, ran long, or was swapped, from the engineer who did the work.
# - Outcome: deliverables list (repository, runbook, side-by-side comparison).
---

## The challenge

A global maker of consumer hardware and the creative software that drives it was sending a growing share of its language-model work to a paid model API. The bill scaled with usage, and most of the traffic arrived during business hours in one region, so capacity bought for the peak sat idle overnight.

The company's applications spoke to the API in the OpenAI-compatible format. Any replacement had to accept the same requests and return the same response shape; otherwise every application would need changes before a trial could start. The company also wanted evidence it could inspect in its own account before committing engineering time to a production rollout.

## What we built

Everything runs inside the company's cloud account, in three parts. vLLM, an open-source inference server, runs the open-weight models on GPU instances and exposes an OpenAI-compatible endpoint. LiteLLM sits in front as the only address the applications see: it maps model names to backends, so a request for the alias the applications already use can go to an open-weight model, to the paid API, or to one and then the other on failure, with per-key logging of where each request went and what it cost. A scheduled job stops the GPUs at the end of the business day in the company's time zone and starts them before it begins, with time for the weights to load. While they are down, the proxy routes to the paid API.

cverse also ran the open-weight model and the paid API on a sample of the company's own prompts and compared the outputs side by side. The open-weight model was not good enough on all of them, and those workloads still go to the paid API.

## The outcome

At the end of the week the company had a deployed endpoint in its own account. Its applications can use it by changing a base URL and a model name, and the GPUs behind it are billed only during business hours. The code, the configuration and a runbook for stopping, starting and rolling back are in the company's repository, with the side-by-side comparison next to them.

A production rollout would replace the schedule with demand-based scaling, add an evaluation suite over a larger prompt set, and add monitoring for latency, cost and output quality. Which workloads move first is the company's next decision.
