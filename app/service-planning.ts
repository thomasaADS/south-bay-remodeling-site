// Practical planning information, not a price quote or a promise of permit eligibility.
export const servicePlanning: Record<string, { title: string; sections: { title: string; text: string }[]; checklist: string[] }> = {
  "kitchen-remodeling": {
    title: "Choose the right scope for your kitchen",
    sections: [
      { title: "Keep the layout or reconfigure it?", text: "Replacing cabinets in their existing positions and relocating a sink or opening a wall are different scopes. Before comparing proposals, mark the appliance locations, work surfaces and routes through the room. Ask what can stay and which changes need plumbing, electrical or structural review." },
      { title: "Coordinate cabinets, appliances and lighting", text: "Cabinet drawings should account for appliance specifications, door swings, outlets and task lighting. Decide which items you will supply and who will confirm measurements before ordering. Ask how an unavailable product or changed selection would affect the plan." },
      { title: "Prepare for construction in an occupied home", text: "Discuss where cooking and food storage will happen while the kitchen is unavailable. Confirm access routes, dust separation, delivery space and expected utility interruptions. Ask which decisions must be complete before demolition begins." },
    ],
    checklist: ["Current layout and the changes you want", "Appliance dimensions and storage priorities", "Known plumbing, electrical or moisture issues", "Questions about permits, allowances and temporary kitchen use"],
  },
  "bathroom-remodeling": {
    title: "Define your bathroom remodel before selecting tile",
    sections: [
      { title: "Refresh finishes or change the layout?", text: "A vanity and finish update has different requirements from moving a toilet, adding a shower or rebuilding a wet area. Record what works in the existing room and where storage, movement or daily use is difficult. Layout decisions should come before final fixture orders." },
      { title: "Plan the shower as a complete system", text: "Drain location, waterproofing, slope, shower entry and glass all need to work together. Ask what preparation is included beneath the tile and how existing damage will be handled if it is uncovered. Confirm dimensions before selecting a shower door or custom glass." },
      { title: "Balance ventilation, storage and access", text: "Discuss ventilation, task lighting and storage along with the visual finishes. If easier access is a priority, raise entry heights, clearances and potential support locations early. Feasibility depends on the room and should be reviewed before choosing products." },
    ],
    checklist: ["The bathroom's dimensions and current fixture locations", "Tub, shower and storage preferences", "Known leaks, moisture marks or ventilation concerns", "Alternative bathroom access during construction"],
  },
};
