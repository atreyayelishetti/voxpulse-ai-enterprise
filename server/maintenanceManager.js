// VoxPulse AI - Enterprise Maintenance Windows & Change Freeze Manager
// Governs Synthetic IVR Testing Suppression During High-Volume Settlement & Network Maintenance Periods

import crypto from 'crypto';

export class MaintenanceManager {
  constructor() {
    this.windows = [];
    this.initializeSeedWindows();
  }

  getMaintenanceWindows({ tenantId = 'org_visa_inc', status } = {}) {
    const now = new Date();
    
    // Update active/expired/scheduled dynamically
    let list = this.windows.filter(w => !tenantId || w.tenantId === tenantId).map(w => {
      const start = new Date(w.startUtc);
      const end = new Date(w.endUtc);
      let calculatedStatus = w.status;

      if (now >= start && now <= end) {
        calculatedStatus = 'ACTIVE';
      } else if (now < start) {
        calculatedStatus = 'SCHEDULED';
      } else {
        calculatedStatus = 'EXPIRED';
      }

      return {
        ...w,
        status: calculatedStatus,
        isActiveNow: now >= start && now <= end
      };
    });

    if (status && status !== 'ALL') {
      list = list.filter(w => w.status === status);
    }

    return list.sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc));
  }

  createMaintenanceWindow({
    tenantId = 'org_visa_inc',
    name,
    description = '',
    startUtc,
    endUtc,
    mode = 'PASSIVE_PROBES_ONLY',
    affectedFlows = ['ALL'],
    approvedBy = 'Elena Rostova',
    ticketReference = `CHG00${Math.floor(10000 + Math.random() * 90000)}`
  }) {
    const id = `maint_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    
    const newWindow = {
      id,
      tenantId,
      name,
      description,
      startUtc,
      endUtc,
      mode,
      affectedFlows,
      approvedBy,
      ticketReference,
      createdAt: new Date().toISOString()
    };

    this.windows.push(newWindow);
    return newWindow;
  }

  deleteMaintenanceWindow(windowId) {
    const idx = this.windows.findIndex(w => w.id === windowId);
    if (idx === -1) return false;
    this.windows.splice(idx, 1);
    return true;
  }

  isUnderActiveFreeze(tenantId = 'org_visa_inc', flowId = null) {
    const windows = this.getMaintenanceWindows({ tenantId });
    const active = windows.find(w => w.isActiveNow && (w.affectedFlows.includes('ALL') || (flowId && w.affectedFlows.includes(flowId))));

    return {
      underFreeze: !!active,
      activeWindow: active || null,
      mode: active ? active.mode : 'NORMAL_TESTING_ALLOWED'
    };
  }

  initializeSeedWindows() {
    const now = new Date();
    const futureDate1 = new Date(now.getTime() + 86400000 * 2).toISOString();
    const futureDate2 = new Date(now.getTime() + 86400000 * 4).toISOString();

    const futureDate3 = new Date(now.getTime() + 86400000 * 60).toISOString();
    const futureDate4 = new Date(now.getTime() + 86400000 * 66).toISOString();

    this.windows = [
      {
        id: 'maint_visa_q4_freeze',
        tenantId: 'org_visa_inc',
        name: 'Visa Q4 Black Friday & Cyber Week Global Settlement Freeze',
        description: 'Global change freeze prohibiting synthetic high-volume load tests during annual peak transaction clearing.',
        startUtc: futureDate3,
        endUtc: futureDate4,
        mode: 'PASSIVE_PROBES_ONLY',
        affectedFlows: ['ALL'],
        approvedBy: 'Elena Rostova (VP Telecom Architecture)',
        ticketReference: 'CHG0094182',
        createdAt: '2026-09-20T10:00:00Z'
      },
      {
        id: 'maint_ashburn_sbc_upgrade',
        tenantId: 'org_visa_inc',
        name: 'Ashburn Data Center SBC Firmware Upgrade (AudioCodes 7.40A)',
        description: 'Rolling reboot and TLS certificate update for AudioCodes Mediant 9000 cluster.',
        startUtc: futureDate1,
        endUtc: futureDate2,
        mode: 'HARD_FREEZE_ALL_TESTS',
        affectedFlows: ['flow_visa_cardholder_main', 'flow_visa_fraud_vaa'],
        approvedBy: 'Marcus Chen (Lead Voice SRE)',
        ticketReference: 'CHG0095204',
        createdAt: '2026-09-25T14:30:00Z'
      }
    ];
  }
}

export const maintenanceManager = new MaintenanceManager();
