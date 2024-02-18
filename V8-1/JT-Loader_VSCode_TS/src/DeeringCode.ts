export class DeeringCode {

    m_sextant: number = 0;
    m_octant: number = 0;
    m_theta: number = 0;
    m_psi: number = 0;

    constructor(sextant: number, octant: number, theta: number, psi: number) {
        this.m_sextant = sextant;
        this.m_octant = octant;
        this.m_theta = theta;
        this.m_psi = psi;
    }
}