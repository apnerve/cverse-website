---
title: "Open-weight models in the company's own cloud, replacing part of a paid LLM API in one week"
summary: "A global consumer-hardware and creative-software company was sending a growing share of its language-model work to a paid model API. It asked whether open-weight models, served inside its own cloud account, could take over part of that work without the applications noticing. cverse built the answer in one week: vLLM for serving, LiteLLM as the single OpenAI-compatible endpoint, and GPUs that are switched off outside business hours."
client: "A global consumer-hardware and creative-software company"
industry: "Consumer hardware and software"
engagement: "Proof of concept"
duration: "One week"
services: ["Production LLM systems", "Private models and fine-tuning"]
stack: ["vLLM", "LiteLLM", "Open-weight models", "GPU instances", "Scheduled hibernation"]
outcomes:
  - headline: "One week"
    caption: "From first call to a working deployment in the company's cloud account."
  - headline: "A base URL and a model name"
    caption: "The two things an application changes to use the new endpoint. No application code changed."
  - headline: "GPUs off overnight"
    caption: "Capacity stops on a schedule at the end of the business day and is back before it starts."
  - headline: "Code in the company's repository"
    caption: "Configuration, deployment and a runbook live in the company's own account."
publishedAt: 2026-11-24
draft: false
# CONFIRM before go-live. These body claims were not supplied by cverse and must be checked
# or deleted. Comments here stay out of the built HTML; comments in the body would not.
# - "A base URL and a model name" outcome: applications switched that way, no code changes.
# - Story at a glance: traffic concentrated in business hours in one region.
# - About the client: which workflows use language models; permission to publish this descriptor.
# - Solution / Routing: fallback from the open-weight model to the paid API was configured.
# - Solution / Hibernation: mechanism (cloud scheduler, cron, autoscaler schedule), warm-up
#   window, and whether off-hours requests fell back to the paid API or were rejected.
# - Solution: output comparison on a sample of the company's prompts. Delete the paragraph if not done.
#   Also: "the alias still points at the paid API for those workloads" is inferred, not supplied.
# - SETBACK WANTED: the case study needs one thing that went wrong, cost more, or was cut
#   (a failed first scheduled start, a warm-up that ran long, a workload that stayed on the
#   paid API, a GPU class that was swapped). Ask the engineer who did the work and add one
#   sentence to The solution or The outcome.
# - "What the week looked like": the day split. Delete the section if it cannot be confirmed.
# - Outcome: deliverables list (repository, runbook, side-by-side comparison).
---

## The story at a glance

A global maker of consumer hardware and the creative software that drives it was sending a growing share of its language-model work to a paid model API. The bill scaled with usage. Most of the traffic arrived during business hours in one region, so capacity bought for the peak sat idle overnight.

The company's question was narrow. Could open-weight models, served inside its own cloud account, take over part of that work without the applications noticing? And could the GPUs run only while people were working? cverse answered with a deployed proof of concept, built in one week.

## About the client

The company makes consumer hardware and the software that drives it, sold to individual makers and small businesses worldwide. Its product and internal teams use language models in several workflows. Its name is withheld at its request.

## The challenge

The company's applications talked to the paid API through the OpenAI-compatible request format. Any replacement had to accept the same requests and return the same response shape; otherwise every calling application would need changes before a trial could start.

Cost was the second constraint. A self-hosted model is only cheaper if the GPUs are not billed around the clock for traffic that arrives eight to ten hours a day. The company wanted the capacity to disappear outside business hours and come back, warm, before the first request of the morning. It also wanted evidence it could inspect in its own account before committing engineering time to a production rollout.

## The solution

Everything runs inside the company's cloud account, in three parts.

**Serving.** vLLM, an open-source inference server, runs the open-weight models on GPU instances. It batches concurrent requests and exposes an OpenAI-compatible endpoint, so from an application's point of view the model behaves like the API it replaces.

**Routing.** LiteLLM sits in front as a proxy and is the only address the applications see. It maps model names to backends: a request for the alias the applications already use can be served by an open-weight model, by the paid API, or by one and then the other on failure. Per-key logging records which requests went where and what they cost.

**Hibernation.** A scheduled job stops the GPU instances at the end of the business day in the company's time zone and starts them before it begins, with time for the model weights to load. While the GPUs are down the proxy stays up and routes to the paid API, so someone working late is not cut off.

Alongside the deployment, the open-weight model and the paid API were run on a sample of the company's own prompts and the outputs compared side by side. The open-weight model was not good enough on all of them. For those workloads the alias still points at the paid API, and the comparison shows which ones they are.

### What the week looked like

1. Access, scope and a cost model: which workloads, which hours, which GPU class.
2. vLLM serving an open-weight model on a GPU instance, reachable inside the account.
3. LiteLLM in front: aliases, keys, fallback, spend logging. The first application pointed at it.
4. Scheduled stop and start, warm-up timing, and the comparison on sample prompts.
5. Handover: repository, configuration, a runbook, and a walkthrough with the company's engineers.

## The outcome

At the end of the week the company had a deployed endpoint in its own account. Its applications can use it by changing a base URL and a model name, and the GPUs behind it are billed only during business hours. The code and configuration are in the company's repository, with a runbook for stopping, starting and rolling back. The side-by-side comparison of output and cost for the sampled workloads sits next to them.

## Looking ahead

The proof of concept runs on a fixed schedule. A production rollout would replace the schedule with demand-based scaling, so capacity follows traffic. It would add an evaluation suite over a larger prompt set, a routing policy that sends each task to the cheapest model that meets its bar, and monitoring for latency, cost and output quality. Where the data supports it, the open-weight model could be fine-tuned on the company's own examples. Which workloads move first is the company's next decision.
