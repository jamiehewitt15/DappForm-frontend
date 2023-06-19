"use client";

import { useState } from "react";
import type { Log } from "viem";
import { useContractEvent } from "wagmi";

import { ContractConfig } from "../contracts";
import { stringify } from "../utils/stringify";

export function WatchContractEvents() {
  const [orgLogs, setOrgLogs] = useState<Log[]>([]);
  useContractEvent({
    ...ContractConfig,
    eventName: "OrganisationCreated",
    listener: (logs) => setOrgLogs((x) => [...x, ...logs]),
  });

  const [wagmiLogs, setWagmiLogs] = useState<Log[]>([]);

  return (
    <div>
      <details>
        <summary>{orgLogs.length} Organisations Created</summary>
        {orgLogs
          .reverse()
          .map((log) => stringify(log))
          .join("\n\n\n\n")}
      </details>
    </div>
  );
}
