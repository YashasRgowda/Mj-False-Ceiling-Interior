import { getProcessSteps } from "@/lib/data";

export async function Process() {
  const steps = await getProcessSteps();

  return (
    <section className="section section-light" id="process">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="h-display" style={{ marginTop: 20 }}>
              Five steps, and you know the <em>price</em> before step four.
            </h2>
          </div>
          <p className="lede side">
            No surprise costs halfway through, no subcontractor you have never met turning up at
            your door. This is the whole process, start to finish.
          </p>
        </div>

        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={step.id} data-reveal data-reveal-delay={i * 60}>
              <div className="no">{step.numeral}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <div className="meta">{step.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
