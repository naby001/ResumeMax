'use client'

import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Chip,
  IconButton,
  Button,
  styled
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: theme.spacing(0.25),
  color: theme.palette.primary.dark,
  fontSize: '1rem',
}));

const Subheading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.25),
  fontSize: '0.875rem',
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '0.875rem',
}));

const A4Paper = styled(Box)(({ theme }) => ({
  width: '210mm',
  minHeight: '297mm',
  padding: theme.spacing(1.5),
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  overflow: 'hidden',
  transformOrigin: 'top left',
  borderRadius: theme.shape.borderRadius,
  pageBreakAfter: 'always',
  pageBreakInside: 'avoid',
  '@media print': {
    width: '210mm',
    height: '297mm',
    boxShadow: 'none',
    margin: 0,
    padding: theme.spacing(1.5),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const renderBulletedContent = (content) => {
  return content.split('\n').map((line, index) => (
    <li key={index} style={{ marginBottom: '0.5rem' }}>{line.trim()}</li>
  ));
};

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    education: '',
    educationSubheadings: [
      { subheading: 'Bachelor of Science in Computer Science', content: 'University of Example\nGraduated: 2020' }
    ],
    skillsSubheadings: [
      { subheading: 'Programming Languages', content: 'JavaScript\nPython\nJava' }
    ],
    projectsSubheadings: [
      { subheading: 'Personal Portfolio', content: 'Developed a personal portfolio website using React and Material-UI.' }
    ],
    positionsSubheadings: [
      { subheading: 'Team Lead', content: 'Led a team of 5 developers in building a web application for a local business.' }
    ],
    extracurricular: 'Member of the university coding club and participated in various hackathons.'
  });

  const [scale, setScale] = useState(1);
  const componentRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubheadingChange = (e, index, section, field) => {
    const { value } = e.target;
    setFormData(prev => {
      const subheadings = [...prev[section]];
      subheadings[index][field] = value;
      return { ...prev, [section]: subheadings };
    });
  };

  const addSubheading = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], { subheading: '', content: '' }]
    }));
  };

  const removeSubheading = (index, section) => {
    setFormData(prev => {
      const subheadings = [...prev[section]];
      subheadings.splice(index, 1);
      return { ...prev, [section]: subheadings };
    });
  };

  const renderSkills = (skills) => {
    return skills.split('\n').map((skill, index) => (
      <Chip key={index} label={skill.trim()} sx={{ margin: '2px' }} />
    ));
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: formData.name || 'Resume',
    onAfterPrint: () => alert('Document saved as PDF'),
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={6} sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <StyledPaper elevation={3}>
            {/* Personal Information */}
            <Section>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Section>

            {/* Education */}
            <Section>
              <SectionTitle variant="h6">Education</SectionTitle>
              {formData.educationSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Education Subheading ${index + 1}`}
                      value={subheading.subheading}
                      onChange={(e) => handleSubheadingChange(e, index, 'educationSubheadings', 'subheading')}
                      variant="outlined"
                      placeholder="Education subheading"
                    />
                    <IconButton onClick={() => removeSubheading(index, 'educationSubheadings')}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label={`Education Content ${index + 1}`}
                    value={subheading.content}
                    onChange={(e) => handleSubheadingChange(e, index, 'educationSubheadings', 'content')}
                    variant="outlined"
                    placeholder="Education content"
                    multiline
                    rows={2}
                  />
                </Box>
              ))}
              <StyledButton onClick={() => addSubheading('educationSubheadings')} startIcon={<AddIcon />} variant="contained" color="primary">
                Add Subheading
              </StyledButton>
            </Section>

            {/* Skills */}
            <Section>
              <SectionTitle variant="h6">Skills</SectionTitle>
              {formData.skillsSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Skills Subheading ${index + 1}`}
                      value={subheading.subheading}
                      onChange={(e) => handleSubheadingChange(e, index, 'skillsSubheadings', 'subheading')}
                      variant="outlined"
                      placeholder="Skills subheading"
                    />
                    <IconButton onClick={() => removeSubheading(index, 'skillsSubheadings')}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label={`Skills Content ${index + 1}`}
                    value={subheading.content}
                    onChange={(e) => handleSubheadingChange(e, index, 'skillsSubheadings', 'content')}
                    variant="outlined"
                    placeholder="Skills content (one per line)"
                    multiline
                    rows={2}
                  />
                </Box>
              ))}
              <StyledButton onClick={() => addSubheading('skillsSubheadings')} startIcon={<AddIcon />} variant="contained" color="primary">
                Add Subheading
              </StyledButton>
            </Section>

            {/* Projects */}
            <Section>
              <SectionTitle variant="h6">Projects</SectionTitle>
              {formData.projectsSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Project Subheading ${index + 1}`}
                      value={subheading.subheading}
                      onChange={(e) => handleSubheadingChange(e, index, 'projectsSubheadings', 'subheading')}
                      variant="outlined"
                      placeholder="Project subheading"
                    />
                    <IconButton onClick={() => removeSubheading(index, 'projectsSubheadings')}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label={`Project Content ${index + 1}`}
                    value={subheading.content}
                    onChange={(e) => handleSubheadingChange(e, index, 'projectsSubheadings', 'content')}
                    variant="outlined"
                    placeholder="Project content"
                    multiline
                    rows={2}
                  />
                </Box>
              ))}
              <StyledButton onClick={() => addSubheading('projectsSubheadings')} startIcon={<AddIcon />} variant="contained" color="primary">
                Add Subheading
              </StyledButton>
            </Section>

            {/* Positions */}
            <Section>
              <SectionTitle variant="h6">Positions of Responsibility</SectionTitle>
              {formData.positionsSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Positions Subheading ${index + 1}`}
                      value={subheading.subheading}
                      onChange={(e) => handleSubheadingChange(e, index, 'positionsSubheadings', 'subheading')}
                      variant="outlined"
                      placeholder="Positions subheading"
                    />
                    <IconButton onClick={() => removeSubheading(index, 'positionsSubheadings')}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label={`Positions Content ${index + 1}`}
                    value={subheading.content}
                    onChange={(e) => handleSubheadingChange(e, index, 'positionsSubheadings', 'content')}
                    variant="outlined"
                    placeholder="Positions content"
                    multiline
                    rows={2}
                  />
                </Box>
              ))}
              <StyledButton onClick={() => addSubheading('positionsSubheadings')} startIcon={<AddIcon />} variant="contained" color="primary">
                Add Subheading
              </StyledButton>
            </Section>

            {/* Extra-curricular Activities */}
            <Section>
              <TextField
                fullWidth
                label="Extra-curricular Activities"
                name="extracurricular"
                value={formData.extracurricular}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                placeholder="Your activities outside academics"
              />
            </Section>
          </StyledPaper>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <StyledIconButton onClick={handleZoomOut}>
              <RemoveIcon />
            </StyledIconButton>
            <StyledIconButton onClick={handleZoomIn}>
              <AddIcon />
            </StyledIconButton>
            <StyledIconButton onClick={handlePrint}>
              <PrintIcon />
            </StyledIconButton>
          </Box>
          <A4Paper ref={componentRef} sx={{ transform: `scale(${scale})` }}>
            {/* Header */}
            <Box textAlign="center" mb={2}>
              <Typography variant="h4" component="h1" gutterBottom>
                {formData.name || 'Your Name'}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {formData.email && <span>{formData.email}</span>}
                {formData.email && formData.phone && <span> • </span>}
                {formData.phone && <span>{formData.phone}</span>}
                {formData.linkedin && <span> • <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
              </Typography>
            </Box>

            {/* Education */}
            <Section>
              <SectionTitle variant="h6">Education</SectionTitle>
              {formData.educationSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Subheading variant="subtitle1">
                    {subheading.subheading}
                  </Subheading>
                  <SectionContent
                    variant="body1"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {subheading.content}
                  </SectionContent>
                </Box>
              ))}
            </Section>

            {/* Skills */}
            <Section>
              <SectionTitle variant="h6">Skills</SectionTitle>
              {formData.skillsSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Subheading variant="subtitle1" sx={{ flexShrink: 0, marginRight: 2 }}>
                    {subheading.subheading}
                  </Subheading>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1 }}>
                    {renderSkills(subheading.content)}
                  </Box>
                </Box>
              ))}
            </Section>

            {/* Projects */}
            <Section>
              <SectionTitle variant="h6">Projects</SectionTitle>
              {formData.projectsSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Subheading variant="subtitle1">
                    {subheading.subheading}
                  </Subheading>
                  <SectionContent
                    variant="body1"
                    component="ul"
                    sx={{ whiteSpace: 'pre-line', paddingLeft: '1.5rem' }}
                  >
                    {renderBulletedContent(subheading.content)}
                  </SectionContent>
                </Box>
              ))}
            </Section>

            {/* Positions */}
            <Section>
              <SectionTitle variant="h6">Positions of Responsibility</SectionTitle>
              {formData.positionsSubheadings.map((subheading, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Subheading variant="subtitle1">
                    {subheading.subheading}
                  </Subheading>
                  <SectionContent
                    variant="body1"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {subheading.content}
                  </SectionContent>
                </Box>
              ))}
            </Section>

            {/* Extra-curricular Activities */}
            {formData.extracurricular && (
              <Section>
                <SectionTitle variant="h6">Extra-curricular Activities</SectionTitle>
                <SectionContent
                  variant="body1"
                  component="ul"
                  sx={{ whiteSpace: 'pre-line', paddingLeft: '1.5rem' }}
                >
                  {renderBulletedContent(formData.extracurricular)}
                </SectionContent>
              </Section>
            )}
          </A4Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

