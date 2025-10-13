import React, { useState, useEffect, useRef } from 'react';

const EnergyAssessmentForm = () => {
  const [formData, setFormData] = useState({
    singleLineDrawing: null,
    hvacSchedule: null,
    controlSystems: '',
    basSequence: null,
    lightingSequence: null,
    hasGenerator: false,
    generatorNameplate: null,
    engineNameplate: null,
    airPermits: null,
    ders: [],
    derDetails: '',
    priorDR: '',
    priorDRStrategies: '',
    operatingHours: '',
    facilityDescription: '',
    motorsAndPumps: '',
    motorsPumpsDetails: ''
  });

  const [fileNames, setFileNames] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00d4ff';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    if (files.length > 0) {
      const names = Array.from(files).map(f => f.name).join(', ');
      setFileNames(prev => ({ ...prev, [fieldName]: names }));
      setFormData(prev => ({ ...prev, [fieldName]: files }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDERChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      ders: checked 
        ? [...prev.ders, value]
        : prev.ders.filter(der => der !== value)
    }));
  };

  const handleSubmit = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      alert('> ANALYSIS COMPLETE\n> ENERGY SPECIALIST WILL CONTACT YOU WITHIN 24 HOURS\n> CURTAILMENT STRATEGY AND REVENUE PROJECTIONS READY');
      setIsAnalyzing(false);
      setFormData({
        singleLineDrawing: null,
        hvacSchedule: null,
        controlSystems: '',
        basSequence: null,
        lightingSequence: null,
        hasGenerator: false,
        generatorNameplate: null,
        engineNameplate: null,
        airPermits: null,
        ders: [],
        derDetails: '',
        priorDR: '',
        priorDRStrategies: '',
        operatingHours: '',
        facilityDescription: '',
        motorsAndPumps: '',
        motorsPumpsDetails: ''
      });
      setFileNames({});
    }, 3000);
  };

  return (
    <div style={styles.body}>
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.container}>
        {!isAnalyzing ? (
          <>
            <div style={styles.header}>
              <span style={styles.badge}>◉ AI-POWERED SYSTEM</span>
              <h1 style={styles.title}>ENERGY ASSESSMENT</h1>
              <p style={styles.subtitle}>&gt; ANALYZING BUILDING SYSTEMS FOR OPTIMAL ENERGY CURTAILMENT_</p>
            </div>

            <div>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>// REQUIRED DOCUMENTATION</h2>

                <QuestionGroup label="01 - ELECTRIC SINGLE LINE DRAWING">
                  <FileUpload 
                    id="file1" 
                    onChange={(e) => handleFileChange(e, 'file1')}
                    fileName={fileNames.file1}
                  />
                </QuestionGroup>

                <QuestionGroup label="02 - BUILDING HVAC SCHEDULE" helper="&gt; INCLUDE: HVAC, AHU, RTUs, CHILLERS, VFDs, EQUIPMENT SIZE">
                  <FileUpload 
                    id="file2" 
                    onChange={(e) => handleFileChange(e, 'file2')}
                    fileName={fileNames.file2}
                  />
                </QuestionGroup>

                <QuestionGroup label="03 - CONTROL SYSTEMS INSTALLED">
                  <textarea 
                    name="controlSystems"
                    value={formData.controlSystems}
                    onChange={handleInputChange}
                    placeholder="&gt; ENTER CONTROL SYSTEMS DATA..."
                    style={styles.textarea}
                  />
                </QuestionGroup>

                <QuestionGroup label="04 - BAS CONTROL SEQUENCE">
                  <FileUpload 
                    id="file4" 
                    onChange={(e) => handleFileChange(e, 'file4')}
                    fileName={fileNames.file4}
                  />
                </QuestionGroup>

                <QuestionGroup label="05 - LIGHTING CONTROL SEQUENCE">
                  <FileUpload 
                    id="file5" 
                    onChange={(e) => handleFileChange(e, 'file5')}
                    fileName={fileNames.file5}
                  />
                </QuestionGroup>

                <QuestionGroup label="06 - GENERATOR DATA">
                  <div style={styles.checkboxItem}>
                    <input 
                      type="checkbox"
                      id="hasGenerator"
                      name="hasGenerator"
                      checked={formData.hasGenerator}
                      onChange={handleInputChange}
                      style={styles.checkbox}
                    />
                    <label htmlFor="hasGenerator" style={styles.checkboxLabel}>GENERATOR(S) ON SITE</label>
                  </div>

                  {formData.hasGenerator && (
                    <div style={{ marginTop: '15px' }}>
                      <FileUpload 
                        id="file6a" 
                        label="[ GENERATOR NAMEPLATE ]"
                        onChange={(e) => handleFileChange(e, 'file6a')}
                        fileName={fileNames.file6a}
                        multiple
                      />
                      <FileUpload 
                        id="file6b" 
                        label="[ ENGINE NAMEPLATE ]"
                        onChange={(e) => handleFileChange(e, 'file6b')}
                        fileName={fileNames.file6b}
                        multiple
                        style={{ marginTop: '15px' }}
                      />
                      <FileUpload 
                        id="file6c" 
                        label="[ AIR PERMITS ]"
                        onChange={(e) => handleFileChange(e, 'file6c')}
                        fileName={fileNames.file6c}
                        multiple
                        style={{ marginTop: '15px' }}
                      />
                    </div>
                  )}
                </QuestionGroup>

                <QuestionGroup label="07 - DISTRIBUTED ENERGY RESOURCES" helper="&gt; SELECT ALL APPLICABLE SYSTEMS:">
                  <div style={styles.checkboxGroup}>
                    {['BESS', 'Solar', 'Wind', 'Hydro', 'Other'].map(der => (
                      <div key={der} style={styles.checkboxItem}>
                        <input 
                          type="checkbox"
                          value={der}
                          checked={formData.ders.includes(der)}
                          onChange={handleDERChange}
                          style={styles.checkbox}
                        />
                        <label style={styles.checkboxLabel}>
                          {der === 'BESS' ? 'BATTERY STORAGE (BESS)' : 
                           der === 'Solar' ? 'SOLAR PV' : 
                           der === 'Other' ? 'OTHER RENEWABLE' : der.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                  <textarea 
                    name="derDetails"
                    value={formData.derDetails}
                    onChange={handleInputChange}
                    placeholder="&gt; TECHNICAL SPECIFICATIONS..."
                    style={{ ...styles.textarea, marginTop: '15px' }}
                  />
                </QuestionGroup>
              </div>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>// ADDITIONAL PARAMETERS</h2>

                <QuestionGroup label="DEMAND RESPONSE HISTORY">
                  <select 
                    name="priorDR"
                    value={formData.priorDR}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                    <option value="">SELECT STATUS</option>
                    <option value="no">NO PRIOR PARTICIPATION</option>
                    <option value="yes">PREVIOUS PARTICIPATION</option>
                  </select>
                  <textarea 
                    name="priorDRStrategies"
                    value={formData.priorDRStrategies}
                    onChange={handleInputChange}
                    placeholder="&gt; IF YES, DESCRIBE CURTAILMENT STRATEGIES..."
                    style={{ ...styles.textarea, marginTop: '15px' }}
                  />
                </QuestionGroup>

                <QuestionGroup label="FACILITY OPERATING HOURS">
                  <input 
                    type="text"
                    name="operatingHours"
                    value={formData.operatingHours}
                    onChange={handleInputChange}
                    placeholder="&gt; ENTER SCHEDULE..."
                    style={styles.input}
                  />
                </QuestionGroup>

                <QuestionGroup label="FACILITY DESCRIPTION">
                  <textarea 
                    name="facilityDescription"
                    value={formData.facilityDescription}
                    onChange={handleInputChange}
                    placeholder="&gt; DESCRIBE OPERATIONS AND CRITICAL PROCESSES..."
                    style={styles.textarea}
                  />
                </QuestionGroup>

                <QuestionGroup label="MOTORS AND PUMPS">
                  <select 
                    name="motorsAndPumps"
                    value={formData.motorsAndPumps}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                    <option value="">SELECT STATUS</option>
                    <option value="yes">YES - MOTORS/PUMPS PRESENT</option>
                    <option value="no">NO MOTORS/PUMPS</option>
                  </select>
                  <textarea 
                    name="motorsPumpsDetails"
                    value={formData.motorsPumpsDetails}
                    onChange={handleInputChange}
                    placeholder="&gt; QUANTITY, SIZE, PURPOSE..."
                    style={{ ...styles.textarea, marginTop: '15px' }}
                  />
                </QuestionGroup>
              </div>

              <button onClick={handleSubmit} style={styles.submitBtn}>
                [ INITIATE AI ANALYSIS ]
              </button>
            </div>
          </>
        ) : (
          <div style={styles.analyzing}>
            <div style={styles.spinner} />
            <h2 style={styles.analyzingTitle}>◉ AI PROCESSING...</h2>
            <p style={styles.analyzingText}>&gt; ANALYZING BUILDING SYSTEMS_</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

const QuestionGroup = ({ label, helper, children }) => (
  <div style={styles.questionGroup}>
    <label style={styles.questionLabel}>
      {label.includes('-') && <span style={styles.questionNumber}>{label.split('-')[0].trim()}</span>}
      {label.includes('-') ? label.split('-')[1].trim() : label}
    </label>
    {helper && <p style={styles.helperText}>{helper}</p>}
    {children}
  </div>
);

const FileUpload = ({ id, label = '[ UPLOAD FILE ]', onChange, fileName, multiple, style }) => (
  <div style={style}>
    <label htmlFor={id} style={styles.fileLabel}>
      {label}
    </label>
    <input 
      type="file"
      id={id}
      onChange={onChange}
      multiple={multiple}
      style={{ display: 'none' }}
    />
    {fileName && <div style={styles.fileName}>✓ {fileName}</div>}
  </div>
);

const styles = {
  body: {
    fontFamily: "'Courier New', monospace",
    background: '#ffffff',
    color: '#00d4ff',
    minHeight: '100vh',
    padding: '40px 20px',
    position: 'relative'
  },
  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.15
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    border: '2px solid #00d4ff',
    padding: '40px',
    boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
    position: 'relative',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    borderBottom: '1px solid #00d4ff',
    paddingBottom: '30px'
  },
  badge: {
    display: 'inline-block',
    border: '1px solid #00d4ff',
    color: '#00d4ff',
    padding: '5px 15px',
    fontSize: '0.8em',
    fontWeight: 600,
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    background: 'rgba(0, 212, 255, 0.05)',
    animation: 'blink 1s infinite'
  },
  title: {
    color: '#0099cc',
    fontSize: '2em',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    textShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
  },
  subtitle: {
    color: '#0099cc',
    fontSize: '0.9em',
    lineHeight: 1.8,
    opacity: 0.9
  },
  section: {
    marginBottom: '50px'
  },
  sectionTitle: {
    color: '#0099cc',
    fontSize: '1.3em',
    fontWeight: 700,
    marginBottom: '30px',
    padding: '10px 0',
    borderBottom: '2px solid #00d4ff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '0 0 5px rgba(0, 212, 255, 0.2)'
  },
  questionGroup: {
    marginBottom: '35px',
    padding: '20px',
    border: '1px solid rgba(0, 212, 255, 0.4)',
    background: 'rgba(0, 212, 255, 0.03)'
  },
  questionLabel: {
    display: 'block',
    color: '#0099cc',
    fontSize: '1em',
    fontWeight: 600,
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  questionNumber: {
    display: 'inline-block',
    border: '1px solid #00d4ff',
    color: '#00d4ff',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: '0.9em',
    marginRight: '10px',
    background: 'rgba(0, 212, 255, 0.05)'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #00d4ff',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#0099cc',
    fontSize: '0.95em',
    fontFamily: "'Courier New', monospace"
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #00d4ff',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#0099cc',
    fontSize: '0.95em',
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: "'Courier New', monospace"
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #00d4ff',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#0099cc',
    fontSize: '0.95em',
    fontFamily: "'Courier New', monospace",
    cursor: 'pointer'
  },
  fileLabel: {
    display: 'block',
    padding: '20px',
    border: '2px dashed #00d4ff',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#00d4ff',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.9em',
    background: 'rgba(0, 212, 255, 0.03)',
    transition: 'all 0.3s'
  },
  fileName: {
    marginTop: '10px',
    fontSize: '0.85em',
    color: '#0099cc',
    textShadow: '0 0 5px rgba(0, 212, 255, 0.3)',
    fontWeight: 600
  },
  checkboxGroup: {
    marginTop: '15px'
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    padding: '8px',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    background: 'rgba(0, 212, 255, 0.02)'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    marginRight: '12px',
    cursor: 'pointer',
    accentColor: '#00d4ff'
  },
  checkboxLabel: {
    fontSize: '0.9em',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#0099cc'
  },
  submitBtn: {
    width: '100%',
    background: '#00d4ff',
    color: '#ffffff',
    padding: '18px',
    fontSize: '1.1em',
    border: '2px solid #00d4ff',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '30px',
    fontFamily: "'Courier New', monospace",
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  helperText: {
    fontSize: '0.8em',
    color: '#0099cc',
    marginTop: '8px',
    marginBottom: '12px',
    opacity: 0.8,
    letterSpacing: '0.5px'
  },
  analyzing: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  spinner: {
    border: '3px solid rgba(0, 212, 255, 0.2)',
    borderTop: '3px solid #00d4ff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 30px',
    boxShadow: '0 0 20px #00d4ff'
  },
  analyzingTitle: {
    color: '#0099cc',
    marginBottom: '15px',
    letterSpacing: '2px'
  },
  analyzingText: {
    color: '#0099cc',
    opacity: 0.8,
    letterSpacing: '1px'
  }
};

export default EnergyAssessmentForm;