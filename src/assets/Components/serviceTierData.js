// Real content for the 8 service-tier pages, pulled from the existing
// live pages (outside.jsx, inside_outside.jsx, etc.) so the redesigned
// versions carry the same real copy and pricing, not placeholders.
const serviceTierData = {
  outside: {
    title: "Outside Only",
    checklist: ["Wash & chamois dry", "Exterior windows", "Wheels clean and tyres gloss", "Spray on wax"],
    sections: [
      {
        heading: "Exterior Wash",
        body: "Our exterior wash thoroughly eliminates dirt and grime from various surfaces, including paint, glass, plastic trims, wheels, chrome, and exhaust tips. We also ensure your paint and windows are chamois dried and apply a glossy finish to your tyres. External Body Check: this service includes the removal of any smudges, smears, or fingerprints, ensuring your vehicle looks immaculate.",
      },
      {
        heading: "Our Products",
        body: "We pride ourselves on using safe and effective chemicals. We exclusively utilize the latest tried, tested, and approved products, including pH-neutral shampoos specially formulated for vehicle cleaning. These chemicals are certified safe for our employees and will not harm your vehicle or any paint protection treatments that have been applied.",
      },
    ],
    pricing: { sedan: 35, suv: 45, fourWd: 55 },
  },
  inside_outside: {
    title: "Inside & Out",
    checklist: ["Includes Outside Only plus", "Interior wiped & dusted", "Interior & boot vacuumed", "Windows clean inside & out"],
    sections: [
      { heading: "The Details", body: "Our Inside & Out service effectively removes dirt and grime from your seats, dashboard, console, and carpets. We also provide vacuuming of the floors, window cleaning, and surface wiping to leave your car's interior immaculate." },
      { heading: "Interior Wiped & Dusted", body: "Your dashboard, centre console, steering wheel, gear shift, handbrake, door trims, and leather or vinyl seats are carefully wiped and dusted with a damp cloth. Cup holders are cleaned, and vents and instruments are dusted using a specialized brush." },
      { heading: "Interior & Boot Vacuumed", body: "We vacuum your seats, including every crease in fabric or leather, along with carpets, mats, and the boot — making sure to reach under the seats. Door pockets and ashtrays are also thoroughly cleaned. Please empty your boot before our service." },
      { heading: "Windows Cleaned Inside & Out", body: "We thoroughly clean all windows inside and out, removing dirt, smudges, and streaks for a crystal-clear finish and improved visibility." },
    ],
    pricing: { sedan: 55, suv: 65, fourWd: 75 },
  },
  premium_wash: {
    title: "Premium Wash",
    checklist: ["Includes Inside & Out clean plus", "Dash & console detailed with all plastic trims", "External plastic trims rejuvenation", "Hand wax & polish", "Seats wiped & spot clean"],
    sections: [
      { heading: "Dash & Console Detailed (incl. all plastic trims)", body: "We meticulously clean and detail your dashboard and console, ensuring all plastic trims are free from dust, dirt, and buildup. Every surface, including buttons, vents, and hard-to-reach areas, is carefully wiped and restored for a fresh, well-maintained look." },
      { heading: "External Plastic Trims Rejuvenation", body: "We revitalize the external plastic trims on your vehicle, restoring their original color and luster. Our treatment protects against UV damage, prevents fading, and helps maintain the trims' durability." },
      { heading: "Hand Wax and Polish", body: "Our Hand Wax & Polish service gives your vehicle a flawless, showroom finish while shielding it from the elements. Applied by hand for precision, our premium-grade wax enhances gloss and removes light oxidation and swirl marks." },
    ],
    pricing: { sedan: 95, suv: 105, fourWd: 115 },
  },
  mini_detail: {
    title: "Mini Detail",
    checklist: ["Includes Premium Wash plus", "Clay block treatment (paint cleansing)", "Interior trims detailed & protection", "Floor mats steam clean"],
    sections: [
      { heading: "Clay Block Treatment (Paint Cleansing)", body: "Using a clay bar, we remove built-up dirt, grime, and pollutants from your vehicle's paint, which can dull its appearance over time. This process smooths the surface, restoring its shine and preparing it for waxing or sealing." },
      { heading: "Interior Trims Detailed & Protected", body: "We carefully clean and detail all interior trims, including dashboard panels, door handles, and center consoles, removing dirt, dust, and grime. After cleaning, we apply a protective layer to safeguard the trims from wear, fading, and UV damage." },
      { heading: "Floor Mats Steam Clean", body: "Our steam cleaning service deeply cleans your floor mats, removing dirt, stains, and odours while disinfecting the fabric, restoring your mats to a fresh, spotless condition." },
    ],
    pricing: { sedan: 149, suv: 179, fourWd: 199 },
  },
  interior_detail: {
    title: "Interior Detail",
    checklist: ["Includes Mini Detail plus", "Carpets steam clean", "Roof lining steam clean", "Odour eliminator treatment", "Fabric seats steam clean", "Leather seats steam clean"],
    sections: [
      { heading: "Carpets Steam Clean", body: "Our steam cleaning service thoroughly cleans your vehicle's carpets, effectively lifting dirt, stains, and odours while sanitizing the fibers, leaving them spotless and looking as good as new." },
      { heading: "Roof Lining Steam Clean", body: "We delicately steam clean your vehicle's roof lining, lifting away dirt, stains, and odours while preserving the fabric's integrity." },
      { heading: "Odour Eliminator Treatment", body: "We go beyond masking odours, effectively neutralizing stubborn scents like smoke, food, or pet odours at their source using advanced technology, leaving a clean, inviting fragrance that lasts." },
      { heading: "Fabric Seats Steam Clean and Condition", body: "A deep and thorough refresh for your car's upholstery, removing grime, bacteria, and stubborn stains while preserving the integrity of the material." },
      { heading: "Leather Seats Clean and Condition", body: "Restores and protects your leather interior, keeping it looking luxurious and feeling smooth, preventing cracking and fading." },
    ],
    pricing: { sedan: 229, suv: 259, fourWd: 279 },
  },
  full_detail: {
    title: "Full Detail",
    tagline: "Best for Regular Care",
    checklist: ["Outside wash and wax", "Windows cleaning", "Interior trims detailed & condition", "Fabric seats steam clean", "Carpet steam clean", "Roof lining clean", "Leather seats clean and condition"],
    sections: [
      { heading: "Outside Wash and Wax", body: "A thorough hand wash to lift dirt and road grime, followed by a protective wax layer. This shields your paint from the elements and leaves a deep, glossy shine that lasts." },
      { heading: "Windows Cleaning", body: "Inside and out, every window is cleaned streak-free for maximum clarity and visibility." },
      { heading: "Interior Trims Detailed & Condition", body: "Dashboard, door panels, and console are wiped down and conditioned to remove dust and grime, restoring a fresh look and protecting surfaces from UV fading and cracking." },
      { heading: "Fabric Seats Steam Clean", body: "A deep steam clean lifts embedded dirt, bacteria, and stains from fabric upholstery, coming out fresh, sanitised, and free of odours." },
      { heading: "Carpet Steam Clean", body: "Floor carpets are steam cleaned to remove trapped dust, dirt, and stains, leaving the cabin floor looking and smelling like new." },
      { heading: "Roof Lining Clean", body: "The roof lining is gently cleaned to remove built-up dust and marks without damaging the fabric." },
      { heading: "Leather Seats Clean and Condition", body: "Leather seats are cleaned and conditioned to lift dirt and grime while keeping the material soft and supple, preventing cracking and fading." },
    ],
    pricing: { sedan: 175, suv: 195, fourWd: 225 },
  },
  signature_detail: {
    title: "Signature Detail",
    tagline: "Best for Restoration",
    checklist: ["Includes Full Detail", "Head light restoration", "Engine bay degrease", "Hand polish"],
    sections: [
      { heading: "Head Light Restoration", body: "Foggy, yellowed headlights are restored back to a clear finish, improving both night-time visibility and the overall look of your car. We sand, polish, and seal each lens for a lasting result." },
      { heading: "Engine Bay Degrease", body: "We strip away built-up grease, dirt, and grime from the engine bay, leaving it noticeably cleaner and easier to inspect." },
      { heading: "Hand Polish", body: "A full hand polish removes light swirl marks and surface oxidation, bringing back depth and gloss to your paintwork, finished by hand for an even, streak-free shine." },
    ],
    pricing: { sedan: 275, suv: 295, fourWd: 325 },
  },
  the_works: {
    title: "The Works",
    tagline: "Best for Offroad & Pre-Sale",
    checklist: ["Includes Signature Detail", "Buff and polish", "Underbody clean (using ramp)"],
    sections: [
      { heading: "Buff and Polish", body: "We machine buff and polish the paintwork to remove light scratches and swirl marks, restoring depth and clarity to the finish." },
      { heading: "Underbody Clean (Using Ramp)", body: "Your car is raised on a ramp so we can thoroughly wash away mud, dirt, and grime built up underneath — essential after off-road driving and before any pre-sale inspection." },
    ],
    pricing: { sedan: 349, suv: 399, fourWd: 449 },
  },
};

export default serviceTierData;
